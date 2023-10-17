FROM node:latest

WORKDIR /app

COPY . .

EXPOSE 3001

COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
