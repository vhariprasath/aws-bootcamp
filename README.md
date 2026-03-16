# Run a Sample Node.js API on EC2 (Amazon Linux)

## 1. Connect to EC2

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ec2-user@<ec2-public-ip>
```

## 2. Install Node.js

```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
```

## 3. Create the app

```bash
mkdir myapp && cd myapp
npm init -y
npm install express
```

```bash
cat > index.js <<EOF
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from EC2!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
EOF
```

## 4. Run it

```bash
node index.js
```

## 5. Test it

From your browser or another terminal:

```
http://<ec2-public-ip>:3000/hello
```

> Make sure port **3000** is open in the EC2 security group inbound rules.
