from rest_framework import serializers
from .models import EtherBlog
class EtherBlogSerializer(serializers.ModelSerializer):
	class Meta:
		model = EtherBlog
		fields = ['etherid']