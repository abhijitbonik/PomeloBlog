from django.conf.urls import url

from .views import MediaUploadView, MediaListApiView

urlpatterns = [
    url(r'^create/$', MediaUploadView.as_view(), name='create'),
    url(r'^list/$', MediaListApiView.as_view(), name='list'),
]