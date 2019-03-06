from rest_framework import serializers
from .models import Media
from etherpad.views import Etherpad

class MediaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Media
		fields = [
			'pk',
			'title',
			'mediafile',
			'latitude',
			'longitude',
			'created_at'
		]

		read_only_fields = ('pk','created_at')