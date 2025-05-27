
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);

  const generateImage = async () => {
    // Placeholder for image generation logic
    const generatedImageUrl = 'https://via.placeholder.com/300'; // Replace with actual image generation logic
    setImageUrl(generatedImageUrl);

    // Save prompt and image URL to Supabase
    const { data, error } = await supabase
      .from('images')
      .insert([{ prompt, image_url: generatedImageUrl }]);

    if (error) {
      console.error('Error saving image:', error);
    } else {
      console.log('Image saved:', data);
      fetchImages();
    }
  };

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('images')
      .select('*');

    if (error) {
      console.error('Error fetching images:', error);
    } else {
      setImages(data);
    }
  };

  return (
    <div>
      <h1>Text to Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a text prompt"
      />
      <button onClick={generateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
      <h2>Generated Images</h2>
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <p>{image.prompt}</p>
            <img src={image.image_url} alt={image.prompt} />
          </div>
        ))}
      </div>
    </div>
  );
}
