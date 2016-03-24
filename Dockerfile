FROM node:5.7-wheezy
# [ONLY UNCOMMENT STEP 1 IF YOU WANT TO RUN A FRESH NPM INSTALL]
# RUN rm -rf /tmp/node_modules && rm -rf /opt/app/node_modules

# Creates a cache layer for node_modules, so npm install only runs if package.json has changed.
RUN npm install -g nodemon webpack gulp@3.9.1
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app/client && cp -a /tmp/node_modules /app

ADD . /app/client

CMD npm start
