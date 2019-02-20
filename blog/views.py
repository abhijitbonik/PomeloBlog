from django.shortcuts import render
from rest_framework import generics
from .serializers import BlogSerializer
from .models import Blog
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

class BlogCreateApiView(generics.CreateAPIView):
	serializer_class = BlogSerializer
	queryset = Blog.objects.all()


class BlogListApiView(generics.ListCreateAPIView):
	serializer_class = BlogSerializer
	queryset = Blog.objects.all()

class BlogRUDApiView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = BlogSerializer

	def get_queryset(self):
		return Blog.objects.all()

	def retrieve(self, request, *args, **kwargs):
		response = super().retrieve(request, *args, **kwargs)
		response['foo'] = 'bar'
		return response