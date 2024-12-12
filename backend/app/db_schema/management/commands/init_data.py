from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.hashers import make_password
from django.db import transaction
from db_schema.models import *
import json



class Command(BaseCommand):
    help = "Closes the specified poll for voting"


    def handle(self, *args, **options):
        self.init_role()

    def init_role(self):
        
        with open('db_schema/management/commands/data/role.json', 'r', encoding="utf-8") as f:
            data = json.load(f)

            for role in data:
                with transaction.atomic():
                    role = Role.objects.create(**role)
                    role.save()
