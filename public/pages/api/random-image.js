export default function handler(req, res) {
  const images = [
    '/images/cat.jpg',
    '/images/dog.jpg',
    '/images/bird.png'
  ];
  
  const randomImage = images[Math.floor(Math.random() * images.length)];
  
  res.status(200).json({
    status: 'success',
    image: randomImage
  });
}