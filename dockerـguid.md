# login docker
```bash   
docker login
```

# create image file
```bash
docker build -t blip-image-caption .
```

# run container
```bash
docker run -d -p 5000:5000 \
    -v $(pwd)/model/token.txt:/app/model/token.txt \
    -v $(pwd)/output:/app/output \
    --name blip-imgcaption-container \
    blip-image-caption
```

# Open the app in browser
```bash
http://127.0.0.1:5000
```

# container status
```bash
docker ps
```

# container logs
```bash
docker logs blip-imgcaption-container
```

# dockerhub

## tag image
```bash
docker tag blip-image-caption amirhofo/blip-image-caption:1.0
```
## push
```bash
docker push amirhofo/blip-image-caption:1.0
```