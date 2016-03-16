FROM node:5.7-wheezy
# [ONLY UNCOMMENT STEP 1 IF YOU WANT TO RUN A FRESH NPM INSTALL]
# RUN rm -rf /tmp/node_modules && rm -rf /opt/app/node_modules

# Creates a cache layer for node_modules, so npm install only runs if package.json has changed.
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app/client && cp -a /tmp/node_modules /app

RUN npm install -g nodemon webpack
COPY . /app/client

WORKDIR /app/client

EXPOSE 8080
EXPOSE 3000

CMD npm start
