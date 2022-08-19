import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = process.env.TEST_ENV_VAR;

type GoogleGeocordingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
};

// declare var google: any;

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // Google APIに送信
    axios.get<GoogleGeocordingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`
    ).then(response => {
        if (response.data.status !== 'OK') {
            throw new Error('座標を取得できませんでした。');
        }
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById("map")! as HTMLElement, {
            center: coordinates,
            zoom: 16,
        });
        new google.maps.Marker({
            position: coordinates,
            map: map,
        });
    }
    ).catch(err => {
        alert(err.message);
        console.log(err);
    })
}

form.addEventListener('submit', searchAddressHandler);