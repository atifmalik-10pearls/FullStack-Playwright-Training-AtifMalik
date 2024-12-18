const { test, expect } = require('@playwright/test');
const createBookingDetails = require('../../test-constants/create-booking-details.json');
const updateBookingDetails = require('../../test-constants/update-booking-details.json');

import { API_BASE_URL, API_USERNAME, API_PASSWORD } from '../../test-constants/constants.js';

var accessToken
var bookingId

test('should be able to update update booking details', async ({ request }) => {

    // Get Token
    const response = await request.post(API_BASE_URL + '/auth',
        { data: { "username": API_USERNAME, "password": API_PASSWORD } });
    expect(response.ok()).toBeTruthy
    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    accessToken = responseBody.token

    // Create Booking
    const createBookingResponse = await request.post(API_BASE_URL + '/booking',
        {
            headers: { 'Content-Type': 'application/json' },
            data: createBookingDetails
        });
    expect(response.ok()).toBeTruthy
    expect(createBookingResponse.status()).toBe(200)
    const createBookingResponseBody = await createBookingResponse.json()
    console.log(createBookingResponseBody)
    bookingId = createBookingResponseBody.bookingid
    const responseBookingDetails = createBookingResponseBody.booking
    expect(responseBookingDetails).toHaveProperty("firstname", createBookingDetails.firstname)
    expect(responseBookingDetails).toHaveProperty("lastname", createBookingDetails.lastname)
    expect(responseBookingDetails).toHaveProperty("totalprice", createBookingDetails.totalprice)
    expect(responseBookingDetails).toHaveProperty("depositpaid", createBookingDetails.depositpaid)

    // Get Booking Before Update
    const beforeUpdateGetBookingResponse = await request.get(API_BASE_URL + '/booking/' + bookingId);
    expect(beforeUpdateGetBookingResponse.status()).toBe(200)
    const beforeUpdateGetBookingBody = await beforeUpdateGetBookingResponse.json()
    console.log(beforeUpdateGetBookingBody)
    expect(beforeUpdateGetBookingBody).toHaveProperty("firstname", createBookingDetails.firstname)
    expect(beforeUpdateGetBookingBody).toHaveProperty("lastname", createBookingDetails.lastname)
    expect(beforeUpdateGetBookingBody).toHaveProperty("totalprice", createBookingDetails.totalprice)
    expect(beforeUpdateGetBookingBody).toHaveProperty("depositpaid", createBookingDetails.depositpaid)

    // Update Booking
    const updateBookingResponse = await request.put(API_BASE_URL + '/booking/' + bookingId,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${accessToken}`
            },
            data: updateBookingDetails
        });
    expect(response.ok()).toBeTruthy
    expect(updateBookingResponse.status()).toBe(200)
    const updatebookingResponse = await updateBookingResponse.json()
    console.log(updatebookingResponse)
    expect(updatebookingResponse).toHaveProperty("firstname", updateBookingDetails.firstname)
    expect(updatebookingResponse).toHaveProperty("lastname", updateBookingDetails.lastname)
    expect(updatebookingResponse).toHaveProperty("totalprice", updateBookingDetails.totalprice)
    expect(updatebookingResponse).toHaveProperty("depositpaid", updateBookingDetails.depositpaid)

    // Get Booking After Update
    const afterUpdateGetBookingResponse = await request.get(API_BASE_URL + '/booking/' + bookingId);
    expect(response.ok()).toBeTruthy
    expect(afterUpdateGetBookingResponse.status()).toBe(200)
    const afterUpdateGetBookingBody = await afterUpdateGetBookingResponse.json()
    console.log(afterUpdateGetBookingBody)
    expect(afterUpdateGetBookingBody).toHaveProperty("firstname", updateBookingDetails.firstname)
    expect(afterUpdateGetBookingBody).toHaveProperty("lastname", updateBookingDetails.lastname)
    expect(afterUpdateGetBookingBody).toHaveProperty("totalprice", updateBookingDetails.totalprice)
    expect(afterUpdateGetBookingBody).toHaveProperty("depositpaid", updateBookingDetails.depositpaid)

});