export const getAssessment = async () => {
    let url = 'http://15.222.168.158/sat-tool/get-sat-questions';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'Token 7b4c76eaa68c192da374d197b2497151c4b08bc9',
                KMQJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoxfQ.F4l8cpGQvyVy1Gc_1R-vGvJpIS_SiVsF71Fv2sncEvM'
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log('result is: ', JSON.stringify(result, null, 4));

        return result;

        /*const {data} = await axios.get(url, {
            headers: {
                Accept: 'application/json',
                Authorization: '7b4c76eaa68c192da374d197b2497151c4b08bc9',
                KMQJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoxfQ.F4l8cpGQvyVy1Gc_1R-vGvJpIS_SiVsF71Fv2sncEvM'
            },
        });

        console.log('data', data)

        return data;*/
    } catch (err) {
        return err.message;
    }
}

export const submitAssessment = () => {
    return true;
}