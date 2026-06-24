from django.core.management.base import BaseCommand
from reviews.models import Review


SEED_REVIEWS = [
    {
        "name":      "San.",
        "location":  "2349 S Golden park Rd\nPhoenix, AZ 76099",
        "rating":    4,
        "part_type": "Transmission",
        "title":     "Absolutely fantastic!",
        "body": (
            "I had an outstanding experience with TransmissionsForSale. The ordering process was "
            "straightforward, and the part arrived much quicker than I anticipated. The transmission "
            "was in excellent condition, exactly as described on the website. I was particularly "
            "impressed by the thorough inspection report that came with it. Overall, a top-notch "
            "service from start to finish. Highly recommend this company to anyone in need of "
            "reliable transmission parts!"
        ),
        "loved_most": "Great customer support\nFast & accurate delivery\nExcellent part condition\nTop-notch inspection report",
        "is_approved": True,
        "is_featured": True,
    },
    {
        "name":      "Alex T.",
        "location":  "1234 Elm Street,\nSpringfield, IL 62704",
        "rating":    5,
        "part_type": "Transmission",
        "title":     "Exceeded all expectations",
        "body": (
            "I was a bit hesitant about buying a used transmission, but TransmissionsForSale exceeded "
            "my expectations. The part arrived on time and was exactly as described. It fit perfectly "
            "and has been running smoothly since installation. The shipping was fast, and the price was "
            "very competitive compared to other sellers. What I loved the most was the accuracy of the "
            "description and the great value for money. I'll certainly be returning for future needs."
        ),
        "loved_most": "Great customer support\nAccurate part description\nFast shipping\nCompetitive pricing",
        "is_approved": True,
        "is_featured": True,
    },
    {
        "name":      "Mark S.",
        "location":  "6789 Pine Street,\nSpringfield, IL 63704",
        "rating":    5,
        "part_type": "Transmission",
        "title":     "Seamless from order to delivery",
        "body": (
            "From the moment I placed my order to the delivery of the part, everything went smoothly. "
            "The customer service team was incredibly responsive and went above and beyond to ensure I "
            "received exactly what I needed. The part was well-packaged and arrived in perfect condition. "
            "I've already recommended this company to several of my colleagues who are also in need of "
            "transmission parts."
        ),
        "loved_most": "Great customer support\nPerfect packaging\nResponsive team\nSmooth ordering process",
        "is_approved": True,
        "is_featured": False,
    },
    {
        "name":      "Linda K.",
        "location":  "4521 Maple Ave,\nDallas, TX 75201",
        "rating":    5,
        "part_type": "Engine",
        "title":     "Worth every penny",
        "body": (
            "After shopping around for weeks, I finally chose TransmissionsForSale and I couldn't be "
            "happier. The quality of the part was exceptional and the price was the best I found online. "
            "Delivery was faster than expected and the customer service helped me confirm compatibility "
            "before I ordered. Five stars all the way!"
        ),
        "loved_most": "Fast shipping\nAccurate part description\nGreat customer support\nCompetitive pricing",
        "is_approved": True,
        "is_featured": False,
    },
    {
        "name":      "Robert D.",
        "location":  "8823 Oak Blvd,\nHouston, TX 77001",
        "rating":    4,
        "part_type": "Transmission",
        "title":     "Solid experience overall",
        "body": (
            "The part I ordered was in great shape and installed without any issues. Shipping took a "
            "couple of days longer than expected but the team kept me updated throughout. The inspection "
            "report gave me confidence in the quality. Would definitely order again."
        ),
        "loved_most": "Quality inspection report\nResponsive team\nGood packaging\nFair pricing",
        "is_approved": True,
        "is_featured": False,
    },
]


class Command(BaseCommand):
    help = "Seeds the 5 original frontend reviews into the database."

    def handle(self, *args, **options):
        created = 0
        skipped = 0
        for data in SEED_REVIEWS:
            # Use title + name as unique key to avoid duplicates on re-run
            exists = Review.objects.filter(name=data["name"], title=data["title"]).exists()
            if exists:
                skipped += 1
                self.stdout.write(f"  SKIP (already exists): {data['name']} — {data['title']}")
                continue

            Review.objects.create(**data)
            created += 1
            self.stdout.write(self.style.SUCCESS(f"  ✅ Created: {data['name']} — {data['title']}"))

        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS(f"Done! {created} review(s) created, {skipped} skipped."))
