"""
Management command: seed_vehicle_years
Populates the VehicleYear table with production year ranges for every
Make+Model combination already in the database.

Usage:
    python manage.py seed_vehicle_years
    python manage.py seed_vehicle_years --clear   # wipe and re-seed
"""

from django.core.management.base import BaseCommand
from vehicles.models import VehicleMake, VehicleModel, VehicleYear

# Known production year ranges per make+model.
# Format:  "Make": { "Model": (start_year, end_year) }
# end_year=2026 means still in production.
YEAR_RANGES = {
    "Acura":       {"ILX":(2013,2022),"MDX":(2001,2026),"RDX":(2007,2026),"RLX":(2014,2020),"TL":(1995,2014),"TLX":(2015,2026),"TSX":(2004,2014),"ZDX":(2010,2013)},
    "Alfa Romeo":  {"Giulia":(2017,2026),"Stelvio":(2018,2026),"Giulietta":(2010,2020),"4C":(2014,2020)},
    "Audi":        {"A3":(1997,2026),"A4":(1995,2026),"A5":(2008,2026),"A6":(1995,2026),"A7":(2012,2026),"A8":(1994,2026),"Q3":(2012,2026),"Q5":(2009,2026),"Q7":(2007,2026),"Q8":(2019,2026),"TT":(1999,2023),"e-tron":(2019,2026),"RS3":(2012,2026),"RS5":(2010,2026),"RS6":(2003,2026),"RS7":(2014,2026),"S3":(2014,2026),"S4":(1992,2026),"S5":(2008,2026),"S6":(1995,2026),"S7":(2012,2026),"S8":(1994,2026)},
    "BMW":         {"1 Series":(2004,2026),"2 Series":(2014,2026),"3 Series":(1975,2026),"4 Series":(2014,2026),"5 Series":(1972,2026),"6 Series":(1976,2018),"7 Series":(1977,2026),"8 Series":(1990,2026),"M2":(2016,2026),"M3":(1987,2026),"M4":(2014,2026),"M5":(1985,2026),"M8":(2020,2026),"X1":(2010,2026),"X2":(2018,2026),"X3":(2004,2026),"X4":(2015,2026),"X5":(2000,2026),"X6":(2008,2026),"X7":(2019,2026),"Z3":(1996,2002),"Z4":(2003,2026)},
    "Buick":       {"Enclave":(2008,2026),"Encore":(2013,2026),"Encore GX":(2020,2026),"Envision":(2016,2026),"LaCrosse":(2005,2019),"Regal":(1973,2020),"Verano":(2012,2017),"Century":(1954,2005),"LeSabre":(1959,2005),"Lucerne":(2006,2011),"Rendezvous":(2002,2007)},
    "Cadillac":    {"ATS":(2013,2019),"CT4":(2020,2026),"CT5":(2020,2026),"CT6":(2016,2020),"CTS":(2003,2019),"Escalade":(1999,2026),"Escalade ESV":(2002,2026),"SRX":(2004,2016),"STS":(2005,2011),"XTS":(2013,2019),"XT4":(2019,2026),"XT5":(2017,2026),"XT6":(2020,2026),"DeVille":(1949,2005),"DTS":(2006,2011)},
    "Chevrolet":   {"Camaro":(1967,2024),"Corvette":(1953,2026),"Silverado 1500":(1999,2026),"Silverado 2500":(1999,2026),"Silverado 3500":(2001,2026),"Tahoe":(1995,2026),"Suburban":(1935,2026),"Equinox":(2005,2026),"Traverse":(2009,2026),"Blazer":(1969,2026),"Colorado":(2004,2026),"Malibu":(1964,2024),"Trax":(2013,2026),"Sonic":(2012,2020),"Spark":(2013,2022),"Impala":(1958,2020),"Cruze":(2011,2019),"Trailblazer":(2021,2026),"Express":(1996,2026),"S10":(1982,2004),"Astro":(1985,2005),"Avalanche":(2002,2013),"Volt":(2011,2019)},
    "Chrysler":    {"300":(2005,2026),"Pacifica":(2017,2026),"PT Cruiser":(2001,2010),"Sebring":(1995,2010),"200":(2011,2017),"Town & Country":(1990,2016),"Voyager":(2020,2023)},
    "Dodge":       {"Charger":(1966,2023),"Challenger":(1970,2023),"Durango":(1998,2026),"Grand Caravan":(1984,2020),"Journey":(2009,2020),"Ram 1500":(1994,2010),"Ram 2500":(1994,2010),"Ram 3500":(1994,2010),"Dart":(2013,2016),"Avenger":(2008,2014),"Caliber":(2007,2012),"Viper":(1992,2017),"Dakota":(1987,2011),"Nitro":(2007,2012),"Magnum":(2005,2008)},
    "Ford":        {"F-150":(1975,2026),"F-250":(1975,2026),"F-350":(1975,2026),"F-450":(1999,2026),"Mustang":(1964,2026),"Explorer":(1991,2026),"Escape":(2001,2026),"Edge":(2007,2024),"Expedition":(1997,2026),"Fusion":(2006,2020),"Focus":(2000,2018),"Taurus":(1986,2019),"Ranger":(1983,2026),"Bronco":(1966,2026),"Bronco Sport":(2021,2026),"EcoSport":(2018,2022),"Maverick":(2022,2026),"Transit":(2015,2026),"Fiesta":(1977,2019),"Flex":(2009,2019),"Crown Victoria":(1992,2011)},
    "GMC":         {"Sierra 1500":(1999,2026),"Sierra 2500":(1999,2026),"Sierra 3500":(2001,2026),"Yukon":(1992,2026),"Yukon XL":(2000,2026),"Terrain":(2010,2026),"Acadia":(2007,2026),"Canyon":(2004,2026),"Envoy":(1998,2009),"Jimmy":(1970,2005)},
    "Honda":       {"Accord":(1976,2026),"Civic":(1972,2026),"CR-V":(1997,2026),"Pilot":(2003,2026),"Odyssey":(1995,2026),"Ridgeline":(2006,2026),"HR-V":(2016,2026),"Fit":(2007,2020),"Passport":(1994,2026),"Insight":(2000,2022),"Element":(2003,2011),"S2000":(2000,2009),"CR-Z":(2011,2016),"Clarity":(2018,2021)},
    "Hyundai":     {"Elantra":(1992,2026),"Sonata":(1985,2026),"Tucson":(2005,2026),"Santa Fe":(2001,2026),"Accent":(1995,2026),"Kona":(2018,2026),"Palisade":(2020,2026),"Venue":(2020,2026),"Ioniq":(2017,2026),"Ioniq 5":(2022,2026),"Ioniq 6":(2023,2026),"Veloster":(2012,2022),"Genesis":(2009,2016),"Santa Cruz":(2022,2026)},
    "Infiniti":    {"Q50":(2014,2026),"Q60":(2017,2026),"QX50":(2015,2026),"QX60":(2013,2026),"QX80":(2014,2026),"G35":(2003,2008),"G37":(2008,2013),"FX35":(2003,2012),"FX37":(2013,2013),"M35":(2006,2012),"Q70":(2014,2019),"QX56":(2004,2013),"QX70":(2014,2017)},
    "Jeep":        {"Wrangler":(1986,2026),"Grand Cherokee":(1993,2026),"Cherokee":(1974,2026),"Compass":(2007,2026),"Renegade":(2015,2026),"Gladiator":(2020,2026),"Patriot":(2007,2017),"Commander":(2006,2010),"Liberty":(2002,2012)},
    "Kia":         {"Sorento":(2003,2026),"Sportage":(1995,2026),"Telluride":(2020,2026),"Soul":(2010,2026),"Forte":(2010,2026),"Stinger":(2018,2023),"Seltos":(2021,2026),"K5":(2021,2026),"Niro":(2017,2026),"EV6":(2022,2026),"Carnival":(2022,2026),"Cadenza":(2014,2020),"Optima":(2001,2020)},
    "Land Rover":  {"Range Rover":(1970,2026),"Range Rover Sport":(2006,2026),"Range Rover Evoque":(2012,2026),"Range Rover Velar":(2018,2026),"Discovery":(1989,2026),"Discovery Sport":(2015,2026),"Defender":(1983,2026)},
    "Lexus":       {"RX 350":(2007,2026),"RX 300":(1999,2003),"ES 350":(2007,2026),"ES 300":(1992,2003),"GX 460":(2010,2026),"GX 470":(2003,2009),"LX 570":(2008,2021),"IS 250":(2006,2015),"IS 300":(2001,2022),"IS 350":(2006,2026),"GS 350":(2007,2011),"LS 460":(2007,2017),"LS 500":(2018,2026),"NX 300":(2015,2021),"UX 250h":(2019,2026),"LC 500":(2017,2026)},
    "Lincoln":     {"Navigator":(1998,2026),"Navigator L":(2007,2026),"Corsair":(2020,2026),"Aviator":(2003,2026),"MKZ":(2007,2020),"MKX":(2007,2018),"Continental":(1940,2020),"Nautilus":(2019,2026),"Town Car":(1981,2011)},
    "Mazda":       {"CX-5":(2013,2026),"CX-9":(2007,2023),"CX-30":(2020,2026),"CX-50":(2023,2026),"MAZDA3":(2004,2026),"MAZDA6":(2003,2021),"MX-5 Miata":(1990,2026),"CX-3":(2016,2021),"CX-7":(2007,2012),"Tribute":(2001,2012),"RX-8":(2004,2012)},
    "Mercedes-Benz":{"C-Class":(1993,2026),"E-Class":(1986,2026),"S-Class":(1954,2026),"GLC":(2016,2026),"GLE":(2016,2026),"GLS":(2017,2026),"CLA":(2014,2026),"A-Class":(2019,2026),"GLB":(2020,2026),"AMG GT":(2016,2026),"G-Class":(1979,2026),"CLS":(2005,2023),"SL":(1954,2026),"ML-Class":(1998,2015),"GL-Class":(2007,2016),"Sprinter":(2001,2026)},
    "Mitsubishi":  {"Outlander":(2003,2026),"Eclipse Cross":(2018,2026),"Galant":(1969,2012),"Lancer":(1973,2017),"Mirage":(2014,2026),"Outlander Sport":(2011,2026),"Endeavor":(2004,2011),"Eclipse":(1989,2012)},
    "Nissan":      {"Altima":(1993,2026),"Rogue":(2008,2026),"Sentra":(1982,2026),"Maxima":(1981,2023),"Frontier":(1998,2026),"Titan":(2004,2026),"Murano":(2003,2026),"Pathfinder":(1987,2026),"Armada":(2004,2026),"370Z":(2009,2020),"350Z":(2003,2009),"GT-R":(2009,2022),"Versa":(2007,2026),"LEAF":(2011,2026),"JUKE":(2011,2017),"Xterra":(2000,2015)},
    "Pontiac":     {"G6":(2005,2010),"G8":(2008,2009),"Solstice":(2006,2010),"Vibe":(2003,2010),"Grand Prix":(1962,2008),"Grand Am":(1973,2005),"Bonneville":(1957,2005),"Firebird":(1967,2002),"GTO":(1964,2006),"Montana":(1997,2009)},
    "Ram":         {"1500":(2010,2026),"1500 Classic":(2019,2026),"2500":(2010,2026),"3500":(2010,2026),"ProMaster":(2014,2026),"ProMaster City":(2015,2022)},
    "Subaru":      {"Outback":(1995,2026),"Forester":(1998,2026),"Impreza":(1993,2026),"Crosstrek":(2013,2026),"Legacy":(1990,2026),"WRX":(2015,2026),"BRZ":(2013,2026),"Ascent":(2019,2026),"Tribeca":(2006,2014)},
    "Toyota":      {"Camry":(1982,2026),"Corolla":(1966,2026),"RAV4":(1996,2026),"Highlander":(2001,2026),"4Runner":(1984,2026),"Tacoma":(1995,2026),"Tundra":(2000,2026),"Sequoia":(2001,2026),"Sienna":(1998,2026),"Avalon":(1995,2022),"Prius":(2001,2026),"Land Cruiser":(1951,2026),"Venza":(2009,2026),"C-HR":(2018,2022),"GR Supra":(2020,2026),"RAV4 Prime":(2021,2026),"Yaris":(2007,2020),"FJ Cruiser":(2007,2014),"Matrix":(2003,2014)},
    "Volkswagen":  {"Jetta":(1980,2026),"Passat":(1973,2022),"Tiguan":(2009,2026),"Atlas":(2018,2026),"Golf":(1975,2026),"Golf GTI":(1976,2026),"ID.4":(2021,2026),"Taos":(2022,2026),"Atlas Cross Sport":(2020,2026),"Beetle":(1998,2019),"CC":(2009,2017),"Touareg":(2003,2017)},
    "Volvo":       {"XC90":(2003,2026),"XC60":(2010,2026),"XC40":(2019,2026),"S60":(2001,2026),"S90":(2017,2026),"V60":(2011,2026),"V90":(2017,2026),"C40":(2022,2026)},
    "Cadillac":    {"Escalade":(1999,2026),"Escalade ESV":(2002,2026),"XT5":(2017,2026),"XT4":(2019,2026),"XT6":(2020,2026),"CT5":(2020,2026),"CT4":(2020,2026),"ATS":(2013,2019),"CTS":(2003,2019)},
    "Mercury":     {"Grand Marquis":(1975,2011),"Mountaineer":(1997,2010),"Milan":(2006,2011),"Mariner":(2005,2011)},
    "Saturn":      {"Vue":(2002,2010),"Ion":(2003,2007),"Aura":(2007,2010),"Sky":(2007,2010)},
    "Scion":       {"tC":(2005,2016),"xB":(2004,2015),"FR-S":(2013,2016),"iM":(2016,2016)},
    "Isuzu":       {"Rodeo":(1991,2004),"Trooper":(1984,2002),"Ascender":(2003,2008)},
    "Suzuki":      {"Grand Vitara":(1999,2013),"SX4":(2007,2013),"Equator":(2009,2012),"Kizashi":(2010,2013)},
    "Oldsmobile":  {"Alero":(1999,2004),"Aurora":(1995,2003),"Bravada":(1991,2004),"Silhouette":(1990,2004),"Intrigue":(1998,2002)},
    "Plymouth":    {"Neon":(1994,2001),"Voyager":(1984,2001),"Breeze":(1996,2000)},
    "Jaguar":      {"XF":(2009,2026),"XE":(2015,2019),"F-Pace":(2017,2026),"E-Pace":(2018,2026),"F-Type":(2014,2026),"XJ":(1968,2019),"I-Pace":(2019,2026)},
    "Porsche":     {"Cayenne":(2003,2026),"Macan":(2015,2026),"Panamera":(2010,2026),"911":(1964,2026),"Taycan":(2020,2026),"718 Boxster":(2017,2026),"718 Cayman":(2017,2026)},
    "MINI":        {"Hardtop 2-Door":(2002,2026),"Hardtop 4-Door":(2015,2026),"Countryman":(2011,2026),"Clubman":(2008,2026),"Convertible":(2005,2026),"Paceman":(2013,2016)},
    "Chrysler":    {"300":(2005,2026),"Pacifica":(2017,2026)},
    "GMC":         {"Sierra 1500":(1999,2026),"Terrain":(2010,2026),"Yukon":(1992,2026),"Acadia":(2007,2026),"Canyon":(2004,2026)},
}

DEFAULT_RANGE = (1995, 2026)


class Command(BaseCommand):
    help = "Seed VehicleYear table with production year ranges for all Make+Model combos"

    def add_arguments(self, parser):
        parser.add_argument("--clear", action="store_true", help="Delete all existing VehicleYear records before seeding")

    def handle(self, *args, **options):
        if options["clear"]:
            count = VehicleYear.objects.all().delete()[0]
            self.stdout.write(self.style.WARNING(f"Cleared {count} existing VehicleYear records."))

        created_total = 0
        skipped_total = 0

        makes = VehicleMake.objects.prefetch_related("models").all()

        for make_obj in makes:
            make_ranges = YEAR_RANGES.get(make_obj.name, {})

            for model_obj in make_obj.models.all():
                year_range = make_ranges.get(model_obj.name, DEFAULT_RANGE)
                start, end = year_range

                bulk = []
                for yr in range(start, end + 1):
                    year_str = str(yr)
                    exists = VehicleYear.objects.filter(
                        make=make_obj, model=model_obj, year=year_str
                    ).exists()
                    if not exists:
                        bulk.append(VehicleYear(make=make_obj, model=model_obj, year=year_str))

                if bulk:
                    VehicleYear.objects.bulk_create(bulk, ignore_conflicts=True)
                    created_total += len(bulk)
                    self.stdout.write(f"  ✓ {make_obj.name} {model_obj.name}: {start}–{end} ({len(bulk)} years)")
                else:
                    skipped_total += len(range(start, end + 1))

        self.stdout.write(self.style.SUCCESS(
            f"\nDone! Created {created_total} VehicleYear records. Skipped {skipped_total} (already existed)."
        ))
