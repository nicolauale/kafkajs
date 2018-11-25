# Use an official Python runtime as parent image
FROM node:8
LABEL maintainer 'Alexandre Nicolau <nicolau@d2i.com.br>'

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Run commands
#RUN pip install --trusted-host pypi.python.org -r requirements.txt \
# && echo "America/Sao_Paulo" > /etc/timezone \
# && ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
# && dpkg-reconfigure --frontend noninteractive tzdata

# Run commands
RUN echo "America/Sao_Paulo" > /etc/timezone \
 && ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
 && dpkg-reconfigure --frontend noninteractive tzdata

# Make port 80 available to the world outside this container
EXPOSE 8888

# Define environment variable
ENV NAME KafkaJS
#ENV PYTHONUNBUFFERED 1

# Run app.py when the container launches
ENTRYPOINT [ "node" ]

# docker image build -t kafkajs:0.1 .
# docker run --name kafkaapi --rm -it -p 8888:8888 kafkajs:0.1 app.js
# docker run --name kafkaapi --rm -d -p 8888:8888 kafkajs:0.1 app.js