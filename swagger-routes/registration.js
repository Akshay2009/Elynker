/**
 * @swagger
 * tags:
 *   name: Business
 *   description: API for managing business information
 * components:
 *   schemas:
 *     Business:
 *       type: object
 *       properties:
 *         company_name:
 *           type: string
 *         document:
 *           type: string
 *         is_active:
 *           type: integer
 *         document_name:
 *           type: string
 *         document_number:
 *           type: string
 *         file_location:
 *           type: string
 *         file_name:
 *           type: string
 *         id:
 *           type: string
 *     BusinessInput:
 *       type: object
 *       properties:
 *         company_name:
 *           type: string
 *         document:
 *           type: string
 *         is_active:
 *           type: integer
 *         document_name:
 *           type: string
 *         document_number:
 *           type: string
 *         file_location:
 *           type: string
 *         file_name:
 *           type: string
 *     Registration:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         image_path:
 *           type: string
 *         ip_address:
 *           type: string
 *         registration_type:
 *           type: integer
 *         dob:
 *           type: string
 *           format: date
 *         latitude:
 *           type: string
 *         longitude:
 *           type: string
 *         steps_completed:
 *           type: boolean
 *         active_steps:
 *           type: integer
 *         city:
 *           type: string
 *         address1:
 *           type: string
 *         address2:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         company_name:
 *           type: string
 *         business_type:
 *           type: integer
 *         business_description:
 *           type: string
 *         education:
 *           type: string
 *         available_hrs_per_week:
 *           type: integer
 *         hourly_rate:
 *           type: number
 *         service_fee:
 *           type: number
 *         currency_id:
 *           type: integer
 *         cover_image:
 *           type: string
 *         category_ids:
 *           type: string
 *         freelancer_role:
 *           type: string
 *         freelancer_bio:
 *           type: string
 *         language:
 *           type: string
 *         about_company:
 *           type: string
 *         whatsapp_number:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         rejected_reason:
 *           type: string
 *         created_by:
 *           type: number
 *         updated_by:
 *           type: number
 *         last_login:
 *           type: string
 *           format: date-time
 *         additional_detail1:
 *           type: string
 *         additional_detail2:
 *           type: string
 *         additional_detail3:
 *           type: string
 * paths:
 *   /api/update/companyLogo/{reg_id}:
 *     put:
 *       summary: Update Company Logo
 *       tags: [Business]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: string
 *       security:
 *         - api_key: []
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 company_logo:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: Company logo updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Company logo updated successfully
 *                 registration:
 *                   id: '123'
 *                   image_path: '/uploads/company/company_logo/logo-123456.jpg'
 *         '404':
 *           description: Company not found
 *         '500':
 *           description: Internal Server Error
 * 
 *   /api/business/{reg_id}:
 *     get:
 *       summary: Get business details by registration ID
 *       tags: [Business]
 *       parameters:
 *         - name: reg_id
 *           in: path
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: string
 *       security:
 *         - api_key: []
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 - company_name: TIN
 *                   document: N/A
 *                   is_active: 1
 *                   document_name: CIN
 *                   document_number: '1111111'
 *                   file_location: ''
 *                   file_name: TCS.exc
 *                   id: '28'
 *                 - company_name: ABC Ltd.
 *                   document: Certificate of Incorporation
 *                   is_active: 1
 *                   document_name: CIN
 *                   document_number: '987654'
 *                   file_location: ''
 *                   file_name: ABC_Certificate.pdf
 *                   id: '29'
 *         '404':
 *           description: Business details not found
 *         '500':
 *           description: Internal Server Error
 *     post:
 *       summary: Save business details by registration ID
 *       tags: [Business]
 *       parameters:
 *         - name: reg_id
 *           in: path
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: string
 *       security:
 *         - api_key: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BusinessInput'
 *       responses:
 *         '200':
 *           description: Business details saved successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: Business details successfully inserted
 *         '500':
 *           description: Internal Server Error
 * 
 *   /api/registration/{reg_id}:
 *     put:
 *       summary: Update Registration Record
 *       tags: [Registration]
 *       parameters:
 *         - name: reg_id
 *           in: path
 *           required: true
 *           description: Registration ID
 *           schema:
 *             type: string
 *       security:
 *         - api_key: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       responses:
 *         '200':
 *           description: Registration record updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Registration record updated successfully
 *                 updatedRegistration:
 *                   id: '123'
 *                   ip_address: '127.0.0.1'
 *                   registration_type: 'user'
 *                   dob: '1990-01-01'
 *                   latitude: 40.7128
 *                   longitude: -74.0060
 *                   steps_completed: 3
 *                   active_steps: 2
 *                   address1: '123 Main St'
 *                   address2: 'Apt 4'
 *                   city: 'City'
 *                   state: 'State'
 *                   country: 'Country'
 *                   education: 'Graduate'
 *                   available_hrs_per_week: 40
 *                   hourly_rate: 25.5
 *                   service_fee: 5.0
 *                   currency_id: 1
 *                   created_by: 'user123'
 *                   updated_by: 'user456'
 *         '404':
 *           description: Registration record not found
 *         '500':
 *           description: Internal Server Error
 *
 *   /api/registration/{user_id}:
 *     get:
 *       summary: Get Registration Record by user_id
 *       tags: [Registration]
 *       parameters:
 *         - name: user_id
 *           in: path
 *           required: true
 *           description: User ID
 *           schema:
 *             type: string
 *       security:
 *         - api_key: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       responses:
 *         '200':
 *           description: Registration record updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Registration record updated successfully
 *                 updatedRegistration:
 *                   id: '123'
 *                   ip_address: '127.0.0.1'
 *                   registration_type: 'user'
 *                   dob: '1990-01-01'
 *                   latitude: 40.7128
 *                   longitude: -74.0060
 *                   steps_completed: 3
 *                   active_steps: 2
 *                   address1: '123 Main St'
 *                   address2: 'Apt 4'
 *                   city: 'City'
 *                   state: 'State'
 *                   country: 'Country'
 *                   education: 'Graduate'
 *                   available_hrs_per_week: 40
 *                   hourly_rate: 25.5
 *                   service_fee: 5.0
 *                   currency_id: 1
 *                   created_by: 'user123'
 *                   updated_by: 'user456'
 *         '404':
 *           description: Registration record not found
 *         '500':
 *           description: Internal Server Error
 *
 *   /api/registration:
 *     get:
 *       summary: Get All Registration
 *       tags: [Registration]
 *       parameters:
 *         - name: x-access-token
 *           in: header
 *           description: Access token for authentication
 *           required: true
 *           schema:
 *             type: string
 *         - name: page
 *           in: query
 *           description: Page for Pagination
 *           schema:
 *             type: integer
 *         - name: pageSize
 *           in: query
 *           description: Page Size to show records on the Page for Pagination
 *           schema:
 *             type: integer
 *       security:
 *         - api_key: []
 *       responses:
 *         '200':
 *           description: Registration record updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: Registration record updated successfully
 *                 updatedRegistration:
 *                   id: '123'
 *                   ip_address: '127.0.0.1'
 *                   registration_type: 'user'
 *                   dob: '1990-01-01'
 *                   latitude: 40.7128
 *                   longitude: -74.0060
 *                   steps_completed: 3
 *                   active_steps: 2
 *                   address1: '123 Main St'
 *                   address2: 'Apt 4'
 *                   city: 'City'
 *                   state: 'State'
 *                   country: 'Country'
 *                   education: 'Graduate'
 *                   available_hrs_per_week: 40
 *                   hourly_rate: 25.5
 *                   service_fee: 5.0
 *                   currency_id: 1
 *                   created_by: 'user123'
 *                   updated_by: 'user456'
 *         '404':
 *           description: Registration record not found
 *         '500':
 *           description: Internal Server Error
 */

