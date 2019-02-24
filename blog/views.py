from django.shortcuts import render
from rest_framework import generics
from .serializers import BlogSerializer
from .models import Blog
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from etherpad.serializers import EtherBlogSerializer
from rest_framework.response import Response
from rest_framework import status
from etherpad.views import Etherpad
from django.conf import settings

class BlogCreateApiView(generics.CreateAPIView):
	serializer_class = BlogSerializer
	queryset = Blog.objects.all()

	def create(self, request, *args, **kwargs):
		serializer = BlogSerializer(data=request.data)
		if serializer.is_valid():
			obj = serializer.save(created_by=request.user)
			ether = Etherpad()
			etherobj = ether.create_ether_blog(obj)
			sessionid = ether.create_session_group(request, etherobj.groupid)
			etherobj=EtherBlogSerializer(etherobj)
			response= Response({
				'blog': serializer.data,
				'ether': etherobj.data,
				'url': settings.SERVERURL
			}, status=status.HTTP_201_CREATED)
			response.set_cookie('sessionID', sessionid)
			return response
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogListApiView(generics.ListCreateAPIView):
	serializer_class = BlogSerializer
	queryset = Blog.objects.order_by('-created_at')

class BlogRUDApiView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = BlogSerializer

	def get_queryset(self):
		return Blog.objects.all()