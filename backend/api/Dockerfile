FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt && rm requirements.txt

COPY src .

EXPOSE 8080

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
