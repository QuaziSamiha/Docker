# === NODE TAKING ALMOST 1GB =========
FROM node:20 

WORKDIR /app

COPY package.json .

# ====== CREATING node_modules FOLDER WITHIN IMAGE AND GOT ALL DEPENDENCIES OF package.json IN node_modules =======
RUN npm install 

# ===== COPYING ALL CODE OF CODE BASE =====
COPY . .

# VOLUME ["/app/logs"]

# === DURING RUNNING CONTAINER 5000 PORT WILL EXPOSE ====
EXPOSE 5000

CMD ["npm", "run", "dev"]