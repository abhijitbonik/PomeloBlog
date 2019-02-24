from rest_framework import serializers
from .models import Blog, states
from etherpad.views import Etherpad

class BlogSerializer(serializers.ModelSerializer):
	created_by = serializers.ReadOnlyField(source='created_by.username')
	class Meta:
		model = Blog
		fields = [
			'pk',
			'title',
			'body',
			'image',
			'created_at',
			'created_by',
			'published_on',
			'views',
			'status',
		]
		read_only_fields = ('pk','created_at','published_on','views')

	def update(self, instance, validated_data):
		ether = Etherpad()
		instance.title = validated_data.get('title', instance.title)
		instance.body = ether.getHTML(instance)
		instance.image = validated_data.get('image', instance.image)
		instance.save()
		return instance