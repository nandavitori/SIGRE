FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
	PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
	build-essential \
	&& rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
	pip install --no-cache-dir -r /app/requirements.txt

COPY . /app

RUN chmod +x /app/scripts/init.sh \
	&& addgroup --system app && adduser --system --group app \
	&& chown -R app:app /app

USER app

EXPOSE 8000

CMD ["/app/scripts/init.sh"]
