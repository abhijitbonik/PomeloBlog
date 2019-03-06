
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Media
from rest_framework import generics
from .serializers import MediaSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

class MediaUploadView(generics.CreateAPIView):
	serializer_class = MediaSerializer
	queryset = Media.objects.all()
	parser_classes = (MultiPartParser,)

	def create(self, request, *args, **kwargs):
		serializer = MediaSerializer(data=request.data)
		if serializer.is_valid():
			self.object = serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super(MediaUploadView, self).dispatch(request, *args, **kwargs)

class MediaListApiView(generics.ListCreateAPIView):
	serializer_class = MediaSerializer
	queryset = Media.objects.order_by('-created_at')