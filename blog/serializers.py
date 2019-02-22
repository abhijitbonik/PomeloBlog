from rest_framework import serializers
from .models import Blog, states
from etherpad.views import Etherpad

class BlogSerializer(serializers.ModelSerializer):
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
	created_by = serializers.ReadOnlyField(source='created_by.username')

	def create(self, validated_data):
		obj = Blog.objects.create(
			title=validated_data.get('title'),
			created_by = self.context['request'].user,
		)
		ether = Etherpad()
		group = ether.create_ether_blog(obj)
		return obj

	def update(self, instance, validated_data):
		ether = Etherpad()
		instance.title = validated_data.get('title', instance.title)
		instance.body = ether.getHTML(instance)
		instance.image = validated_data.get('image', instance.image)
		return instance