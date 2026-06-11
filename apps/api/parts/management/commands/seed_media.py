import os
import shutil
from django.core.management.base import BaseCommand
from django.conf import settings
from parts.models import Partner, PartPage

class Command(BaseCommand):
    help = "Seed partner logos and hero videos from the frontend public folder into the backend media folder."

    def handle(self, *args, **options):
        # Paths
        frontend_logos_dir = os.path.join(settings.BASE_DIR, '../web/public/images/logos')
        frontend_videos_dir = os.path.join(settings.BASE_DIR, '../web/public/videos')
        
        media_logos_dir = os.path.join(settings.MEDIA_ROOT, 'partners/logos')
        media_videos_dir = os.path.join(settings.MEDIA_ROOT, 'hero/videos')

        os.makedirs(media_logos_dir, exist_ok=True)
        os.makedirs(media_videos_dir, exist_ok=True)

        self.stdout.write("--- Seeding Partner Logos ---")
        partners = Partner.objects.all()
        for p in partners:
            logo_filename = f"{p.label.lower()}.png"
            src_path = os.path.join(frontend_logos_dir, logo_filename)
            if os.path.exists(src_path):
                dest_path = os.path.join(media_logos_dir, logo_filename)
                shutil.copy2(src_path, dest_path)
                p.logo.name = f"partners/logos/{logo_filename}"
                p.save()
                self.stdout.write(self.style.SUCCESS(f"Linked logo for {p.label}"))
            else:
                self.stdout.write(self.style.WARNING(f"Missing logo for {p.label} ({logo_filename})"))

        self.stdout.write("\n--- Seeding Hero Videos ---")
        pages = PartPage.objects.all()
        for page in pages:
            # Check for specific names based on slug, or default legacy names
            possible_filenames = [f"{page.slug}.mp4"]
            if page.slug == "transmissions-for-sale":
                possible_filenames.append("gearbox.mp4")
            elif page.slug == "engines-for-sale":
                possible_filenames.append("engine.mp4")

            video_found = False
            for filename in possible_filenames:
                src_path = os.path.join(frontend_videos_dir, filename)
                if os.path.exists(src_path):
                    dest_path = os.path.join(media_videos_dir, filename)
                    shutil.copy2(src_path, dest_path)
                    page.hero_video_upload.name = f"hero/videos/{filename}"
                    page.save()
                    self.stdout.write(self.style.SUCCESS(f"Linked video {filename} to {page.slug}"))
                    video_found = True
                    break
            
            if not video_found:
                self.stdout.write(self.style.WARNING(f"Missing video for {page.slug}"))

        self.stdout.write(self.style.SUCCESS("\nDone seeding media!"))
