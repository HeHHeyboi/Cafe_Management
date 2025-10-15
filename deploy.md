# Package 
jdk21, npm, nodejs, pm2 

# Login to Server 
ssh <username>@<ip-address> 

# Copy file to server 
scp <file> <username>@<ip-address>:<directory-on-server>

# use pm2 
pm2 start "java -jar <file>.jar" --name "backend" # for spring boot backend  
pm2 start "npm run start" -- name "frontend" # for frontend 

# use cloudflare to public and get https 
cloudflared tunnel --protocol http2 run ./config.yml 
or 
cloudflared tunnel run http://localhost:<port> 
