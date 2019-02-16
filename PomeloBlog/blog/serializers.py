from rest_framework import serializers
from .models import Blog


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
		read_only_fields = ('pk','created_at','created_by','published_on',)

	def create(self, validated_data):
		obj = Blog.objects.create(
			title=validated_data.get('title'),
			body =validated_data.get('body'),
			image =validated_data.get('image'),
			created_by = self.context['request'].user,
			status =validated_data.get('status')
		)
		return obj

	def update(self, instance, validated_data):
		instance.title = validated_data.get('title', instance.title)
		instance.body = validated_data.get('body', instance.body)
		instance.image = validated_data.get('image', instance.image)
		return instance