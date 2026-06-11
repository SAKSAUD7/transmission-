from django.core.management.base import BaseCommand
from parts.models import PartPage, PartType, PackageDetail

PARTS_DATA = [
  {
    "slug": "transmissions-for-sale",
    "name": "Transmissions", "page_title": "TransmissionsForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/transmission.png",
    "video_url": "/videos/gearbox.mp4",
    "about_text": "At TransmissionsForSale, we are dedicated to providing top-quality transmission parts at competitive prices. With years of experience in the automotive industry, we've built a reputation for offering reliable, high-performance components that meet the needs of our customers across the nation.",
    "about_extra": "Our vast inventory includes a wide range of transmissions and related parts, ensuring you find exactly what you need, whether you're a mechanic, car enthusiast, or just someone in need of a replacement part.",
    "part_type_label": "Select Transmission Type",
    "part_finder_title": "Pick Your Ideal Transmission Brand and Discover Best Options for Your Vehicle",
    "benefit_title": "Why Choose Us for Transmissions?",
    "part_types": ["Automatic","Manual / Standard","CVT","Semi-Automatic","Dual-Clutch (DCT)","Tiptronic","Torque Converter","4-Speed Automatic","5-Speed Automatic","6-Speed Automatic","8-Speed Automatic","10-Speed Automatic"],
    "package_details": ["All internal transmission components including the torque converter.","Torque converter included only with automatic transmissions.","Transmissions will be inspected for shavings before delivery."],
  },
  {
    "slug": "engines-for-sale",
    "name": "Engines", "page_title": "EngineForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/engine.png",
    "video_url": "/videos/engine.mp4",
    "about_text": "At EngineForSale, we are dedicated to offering high-quality used and refurbished engines at competitive prices. With years of expertise in the automotive industry, we've established a strong reputation for providing reliable, high-performance engines nationwide.",
    "about_extra": "Our comprehensive inventory includes a wide range of engines, ensuring you find the perfect fit. Each engine undergoes rigorous testing and inspection to ensure it meets our stringent quality standards.",
    "part_type_label": "Select Engine Type",
    "part_finder_title": "Choose Your Ideal Engine Brand and Find the Best Fit for Your Vehicle",
    "benefit_title": "Why Choose Us for Engines?",
    "part_types": ["4-Cylinder","6-Cylinder (V6)","8-Cylinder (V8)","3-Cylinder","5-Cylinder","10-Cylinder (V10)","12-Cylinder (V12)","Diesel","Hybrid","Electric","Turbocharged","Supercharged"],
    "package_details": ["Engines include all necessary components for installation.","All engines are tested for performance before delivery.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "axle-shaft-for-sale",
    "name": "Axle Shaft", "page_title": "AxleShaftForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/axle-shaft.png",
    "about_text": "At Auto Parts For Sale, we pride ourselves on providing high-quality used and aftermarket axle shafts designed to meet the needs of a wide range of vehicles.",
    "about_extra": "Every axle shaft we sell is ready to perform under demanding conditions.",
    "part_type_label": "Select Axle Shaft Type",
    "part_finder_title": "Choose the right axle shaft for your vehicle from our selection of high-quality, tested options.",
    "benefit_title": "Why Choose Us for Axle Shafts?",
    "part_types": ["Front Axle Shaft","Rear Axle Shaft","CV Axle Shaft","Half Shaft","4WD Axle Shaft","AWD Axle Shaft"],
    "package_details": ["All necessary components for installation.","All axle shafts are tested for quality.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "drive-shaft-for-sale",
    "name": "Drive Shaft", "page_title": "DriveShaftForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/drive-shaft.png",
    "about_text": "At Drive Shaft For Sale, we are committed to offering high-quality used and aftermarket drive shafts that meet the highest standards of performance and durability.",
    "about_extra": "Each drive shaft is inspected to ensure it performs reliably before delivery.",
    "part_type_label": "Select Drive Shaft Type",
    "part_finder_title": "Find the perfect drive shaft for your vehicle with our high-quality, thoroughly tested options.",
    "benefit_title": "Why Choose Us for Drive Shafts?",
    "part_types": ["Front Drive Shaft","Rear Drive Shaft","Two-Piece Drive Shaft","Carbon Fiber Drive Shaft","Aluminum Drive Shaft","Steel Drive Shaft"],
    "package_details": ["All drive shafts are inspected before delivery.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "differential-for-sale",
    "name": "Differential", "page_title": "DifferentialForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/differential.png",
    "about_text": "Specializing in high-quality used and aftermarket differentials for a wide range of vehicles.",
    "part_type_label": "Select Differential Type",
    "part_finder_title": "Find the right differential for your vehicle with our high-quality, thoroughly tested selection.",
    "benefit_title": "Why Choose Us for Differentials?",
    "part_types": ["Open Differential","Limited Slip Differential (LSD)","Locking Differential","Torsen Differential","Electronic Differential","Front Differential","Rear Differential"],
    "package_details": ["All differentials are inspected for quality.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "speedometer-for-sale",
    "name": "Speedometer", "page_title": "SpeedometerForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/speedometer.png",
    "about_text": "At Speedometer For Sale, we are dedicated to providing high-quality used and refurbished speedometers that meet the demands of various vehicles.",
    "part_type_label": "Select Speedometer Type",
    "part_finder_title": "Find the right speedometer for your vehicle with our high-quality, thoroughly tested options.",
    "benefit_title": "Why Choose Us for Speedometers?",
    "part_types": ["Analog Speedometer","Digital Speedometer","Electronic Speedometer","GPS Speedometer","Cluster Assembly"],
    "package_details": ["All speedometer components for installation.","All speedometers are tested.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "throttle-body-for-sale",
    "name": "Throttle Body", "page_title": "ThrottleBodyForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/throttle-body.png",
    "about_text": "At Throttle Body For Sale, we specialize in offering high-quality used and aftermarket throttle bodies to enhance your vehicle's performance.",
    "part_type_label": "Select Throttle Body Type",
    "part_finder_title": "Choose your ideal throttle body from our selection of high-quality, tested components.",
    "benefit_title": "Why Choose Us for Throttle Bodies?",
    "part_types": ["Electronic Throttle Body","Cable-Driven Throttle Body","Performance Throttle Body","OEM Replacement"],
    "package_details": ["All throttle bodies are tested for functionality.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "transfer-case-assembly-for-sale",
    "name": "Transfer Case Assembly", "page_title": "TransferCaseAssemblyForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/transfer-case.png",
    "about_text": "At Transfer Case Assembly For Sale, we are committed to providing high-quality used and aftermarket transfer case assemblies for 4WD and AWD vehicles.",
    "part_type_label": "Select Transfer Case Type",
    "part_finder_title": "Find the perfect transfer case assembly for your vehicle with our high-quality, tested options.",
    "benefit_title": "Why Choose Us for Transfer Case Assemblies?",
    "part_types": ["Part-Time 4WD","Full-Time 4WD","AWD Transfer Case","Electronic Transfer Case","Manual Transfer Case"],
    "package_details": ["All parts inspected for quality.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "steering-gear-rack-pinion-for-sale",
    "name": "Steering Gear Rack & Pinion", "page_title": "SteeringGearRackPinionForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/steering-rack.png",
    "about_text": "At Steering Gear Rack & Pinion For Sale, we are dedicated to offering high-quality used and aftermarket steering gear racks and pinions.",
    "part_type_label": "Select Rack & Pinion Type",
    "part_finder_title": "Find the right steering gear rack and pinion for your vehicle.",
    "benefit_title": "Why Choose Us for Steering Gear Racks & Pinions?",
    "part_types": ["Power Steering Rack","Manual Steering Rack","Electric Power Steering (EPS)","Hydraulic Rack & Pinion","Variable Ratio Steering"],
    "package_details": ["All parts inspected for quality.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "intake-manifold-for-sale",
    "name": "Intake Manifold", "page_title": "IntakeManifoldForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/intake-manifold.png",
    "about_text": "At Intake Manifold For Sale, we specialize in offering high-quality used and aftermarket intake manifolds to enhance your vehicle's engine performance.",
    "part_type_label": "Select Intake Manifold Type",
    "part_finder_title": "Choose your ideal intake manifold from our high-quality, thoroughly tested selection.",
    "benefit_title": "Why Choose Us for Intake Manifolds?",
    "part_types": ["Single Plane Intake Manifold","Dual Plane Intake Manifold","Aluminum Intake Manifold","Composite Intake Manifold","Variable Intake Manifold (VIM)"],
    "package_details": ["All parts inspected for proper fit.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "steering-column-for-sale",
    "name": "Steering Column", "page_title": "SteeringColumnForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/steering-column.png",
    "about_text": "Providing high-quality used and refurbished steering columns for a wide range of vehicles.",
    "part_type_label": "Select Steering Column Type",
    "part_finder_title": "Find the perfect steering column for your vehicle with our high-quality, tested options.",
    "benefit_title": "Why Choose Us for Steering Columns?",
    "part_types": ["Tilt Steering Column","Telescoping Steering Column","Fixed Steering Column","Collapsible Steering Column","Electric Power Steering Column"],
    "package_details": ["All parts necessary for installation.","All parts inspected for quality.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "spindle-knuckle-for-sale",
    "name": "Spindle Knuckle", "page_title": "SpindleKnuckleForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/spindle-knuckle.png",
    "about_text": "At Spindle Knuckle For Sale, we specialize in offering high-quality used and refurbished spindle knuckles for a variety of vehicles.",
    "part_type_label": "Select Spindle Knuckle Type",
    "part_finder_title": "Find the perfect spindle knuckle for your vehicle with our high quality, tested options.",
    "benefit_title": "Why Choose Us for Spindle Knuckles?",
    "part_types": ["Front Spindle Knuckle","Rear Spindle Knuckle","Cast Iron Knuckle","Aluminum Knuckle","Performance Knuckle"],
    "package_details": ["All spindle knuckles are inspected for functionality.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "axle-assembly-for-sale",
    "name": "Axle Assembly", "page_title": "AxleAssemblyForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/axle-assembly.png",
    "about_text": "At Axle Assembly For Sale, we offer a diverse selection of quality used and aftermarket axle assemblies.",
    "part_type_label": "Select Axle Assembly Type",
    "part_finder_title": "Find the ideal axle assembly for your vehicle with our extensive selection of high-quality options.",
    "benefit_title": "Why Choose Us for Axle Assemblies?",
    "part_types": ["Front Axle Assembly","Rear Axle Assembly","Complete Axle Assembly","4WD Axle Assembly","AWD Axle Assembly"],
    "package_details": ["All parts inspected before delivery.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "abs-assembly-for-sale",
    "name": "ABS Assembly", "page_title": "ABSAssemblyForSale",
    "hero_image": "/images/hero.png", "product_image": "/images/abs-assembly.png",
    "about_text": "At ABS Assembly For Sale, we provide high-quality used and aftermarket ABS assemblies at competitive pricing.",
    "part_type_label": "Select ABS Assembly Type",
    "part_finder_title": "Find the right ABS assembly for your vehicle with our high-quality, tested options.",
    "benefit_title": "Why Choose Us for ABS Assemblies?",
    "part_types": ["ABS Control Module","ABS Pump & Motor Assembly","ABS Wheel Speed Sensor","Complete ABS Assembly","Hydraulic Control Unit (HCU)"],
    "package_details": ["All ABS assemblies are inspected before delivery.","30 Days — Replacement or Refund."],
  },
  {
    "slug": "control-module-for-sale",
    "name": "Control Module", "page_title": "ControlModuleForSale",
    "hero_image": "/images/hero-transmission.jpg", "product_image": "/images/control-module.png",
    "about_text": "At Control Module For Sale, we specialize in offering high-quality used and refurbished control modules for a variety of vehicles.",
    "part_type_label": "Select Module Type",
    "part_finder_title": "Find the right control module for your vehicle with our range of high-quality, tested options.",
    "benefit_title": "Why Choose Us for Control Modules?",
    "part_types": ["Engine Control Module (ECM)", "Transmission Control Module (TCM)", "Powertrain Control Module (PCM)", "Body Control Module (BCM)", "ABS Control Module"],
    "package_details": ["All control modules are inspected for functionality.", "30 Days - Replacement or Refund."],
  },
  {
    "slug": "engine-body-control-module-for-sale",
    "name": "Engine / Body Control Module", "page_title": "EngineBodyControlModuleForSale",
    "hero_image": "/images/hero-transmission.jpg", "product_image": "/images/control-module.png",
    "about_text": "At Engine / Body Control Module For Sale, we specialize in offering high-quality used and refurbished engine and body control modules for a variety of vehicles.",
    "part_type_label": "Select Module Type",
    "part_finder_title": "Find the right control module for your vehicle with our range of high-quality, tested options.",
    "benefit_title": "Why Choose Us for Control Modules?",
    "part_types": ["Engine Control Module (ECM)", "Powertrain Control Module (PCM)", "Body Control Module (BCM)", "Transmission Control Module (TCM)", "ABS Control Module"],
    "package_details": ["All control modules are inspected for functionality.", "30 Days - Replacement or Refund."],
  },
]


class Command(BaseCommand):
    help = "Seed all 14 part pages with their types and package details"

    def handle(self, *args, **options):
        created = 0
        for data in PARTS_DATA:
            part_types    = data.pop("part_types", [])
            pkg_details   = data.pop("package_details", [])
            page, is_new  = PartPage.objects.update_or_create(slug=data["slug"], defaults=data)
            if is_new:
                created += 1

            # Re-create part types
            page.part_types.all().delete()
            for i, label in enumerate(part_types):
                PartType.objects.create(part_page=page, label=label, order=i)

            # Re-create package details
            page.package_details.all().delete()
            for i, text in enumerate(pkg_details):
                PackageDetail.objects.create(part_page=page, detail_text=text, order=i)

        self.stdout.write(self.style.SUCCESS(
            f"[OK] Seeded {len(PARTS_DATA)} part pages ({created} new). All part types and package details updated."
        ))
