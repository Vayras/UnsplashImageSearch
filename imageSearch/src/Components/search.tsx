import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getImages } from '../api/api';
import { Gallery } from './gallery';

export const Search = () => {
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (search.trim() !== '') {
                fetchData();
            }
        }, 300); // Debounce for 300ms
        return () => clearTimeout(delay);
    }, [search]);

    async function fetchData() {
        setLoading(true);
        try {
            const response = await getImages(search);
            setSearchData(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='h-screen justify-center items-center  flex flex-col gap-[6rem] bg-gray-900 '>
            <div className='relative'>
                <input
                    value={search}
                    className="focus:outline-none border-2 h-[3.5rem] w-[35rem] bg-transparent rounded-full text-white py-4 px-12"
                    type="text"
                    name="search"
                    id="search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch
                    className="absolute left-4 top-[1.20rem] w-5 h-5 text-white cursor cursor-pointer"
                />
            </div>
            {loading ? (
                <div className='text-2xl font-semibold text-white'>Loading some cool images...</div>
            ) : (
                <Gallery data={searchData} />
            )}
        </div>
    );
}
