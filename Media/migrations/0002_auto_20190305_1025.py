# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-03-05 10:25
from __future__ import unicode_literals

from django.db import migrations, models
import location_field.models.plain


class Migration(migrations.Migration):

    dependencies = [
        ('Media', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='media',
            name='city',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='media',
            name='location',
            field=location_field.models.plain.PlainLocationField(max_length=63, null=True),
        ),
    ]