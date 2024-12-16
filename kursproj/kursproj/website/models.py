from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=200)
    meta_description = models.TextField()
    course_name = models.CharField(max_length=200)
    course_description = models.TextField()
    course_image = models.URLField()
    course_video = models.URLField()

    def __str__(self):
        return self.title

class Lesson(models.Model):
    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Topic(models.Model):
    lesson = models.ForeignKey(Lesson, related_name='topics', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    lesson_number = models.CharField(max_length=20)
    duration = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class User(models.Model):
    fullname = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # Зберігаємо пароль у зашифрованому вигляді
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)  # Додано поле для останнього входу

    def __str__(self):
        return self.fullname
