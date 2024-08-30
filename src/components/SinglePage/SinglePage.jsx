import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';

function Singleproduct() {
    const [car, setCar] = useState(null);
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImage] = useState(null);
    const { id } = useParams();
    const { addItem } = useCart();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
                    headers: {
                        'Content-type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                setMessage('Could not fetch user data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    useEffect(() => {
        fetchCarData();
        fetchImageData();
    }, [id]);

    const fetchCarData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/car/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCar(data);
        } catch (error) {
            console.error('Error fetching car data:', error);
        }
    };

    const fetchImageData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/image/carImage/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setImages(data);
            if (data && data[0]) {
                setActiveImage(data[0].imageUrl); // Set initial active image
            }
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };

    const handleAddToCart = () => {
        const itemToAdd = {
            id: car.id,
            name: `${car.year} ${car.make} ${car.model}`,
            image: images[0]?.imageUrl, // Ensure there's an image to use
            price: car.price,
            quantity: 1
        };
        addItem(itemToAdd);
        setMessage('🚗 Car Added Successfully! 👍');
    };

    if (!car || loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-16 p-6">
            {/* Main Image Section */}
            <div className="flex flex-col gap-4 w-full md:w-1/2">
                {activeImg && (
                    <img
                        src={activeImg}
                        alt="Main"
                        className="w-full h-96 object-cover rounded-md"
                    />
                )}
                <div className="flex overflow-x-auto gap-2 py-2">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.imageUrl}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-24 h-16 object-cover rounded-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
                            onClick={() => setActiveImage(image.imageUrl)}
                        />
                    ))}
                </div>
            </div>

            {/* Car Details Section */}
            <div className="flex flex-col gap-4 md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-700 text-lg">{car.year}</p>
                <span className="text-3xl font-bold">{car.make} {car.model}</span>
                <div className="flex gap-3">
                    <div className="bg-slate-300 text-base p-2 rounded-lg font-semibold">{car.mileage} KM</div>
                    <div className="bg-slate-300 text-base p-2 rounded-lg font-semibold">{car.fuel_type}</div>
                    <div className="bg-slate-300 text-base p-2 rounded-lg font-semibold">{car.transmission_type}</div>
                </div>
                <h6 className="text-2xl font-bold text-blue-500">Rs {car.price}</h6>
                <div className="flex flex-row items-center pt-4">
                    {userData ? (
                        <button
                            className="bg-blue-400 hover:bg-blue-500 transition duration-300 font-semibold px-5 py-2 text-white rounded-md"
                            onClick={handleAddToCart}
                        >
                            Book Test Drive
                        </button>
                    ) : (
                        <Link to="/login" className="bg-red-400 hover:bg-red-500 transition duration-300 font-semibold px-5 py-2 text-white rounded-md">
                            Login to Book Test Drive
                        </Link>
                    )}
                    {message && <p className="pl-5 text-red-500">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Singleproduct;
