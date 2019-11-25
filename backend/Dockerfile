FROM python:3.7-alpine

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

RUN mkdir -p static
RUN mv app.cfg test.cfg
RUN apk add binutils libc-dev curl

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
EXPOSE 5000
