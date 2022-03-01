FROM postgres AS task-db
RUN echo "initializing Dockerfile..."
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=task-db
EXPOSE 5432
VOLUME [ "./pg-data:var/lib/postgresql/data" ]
