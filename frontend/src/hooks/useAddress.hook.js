import { useEffect, useState } from 'react';

const useApiData = (url, condition) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!condition) {
                setData([]);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok)
                    throw new Error('Network response was not ok');
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, condition]);

    return [data, loading, error];
};

export const useProvinces = () => {
    const [provinces, loading, _error] = useApiData(
        'https://provinces.open-api.vn/api/p/',
        true
    );
    return [provinces, loading];
};

export const useDistricts = (provinceCode) => {
    const [districts, loading, _error] = useApiData(
        provinceCode
            ? `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
            : null,
        provinceCode
    );
    return [districts?.districts || [], loading];
};

export const useWards = (districtCode) => {
    const [wards, loading, _error] = useApiData(
        districtCode
            ? `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
            : null,
        districtCode
    );
    return [wards?.wards || [], loading];
};
