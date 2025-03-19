import express from 'express';
import { AcceptAPickUp, getAllAcceptedPickUps, getAllPickUpsWithInState, SchedulePickUp } from '../Controllers/SchedulePickUp.js';

const router = express.Router()

router.route('/schedulepickup').post(SchedulePickUp)
router.route('/getallpickupswithinstate/:state').get(getAllPickUpsWithInState)
router.route('/acceptapickup').post(AcceptAPickUp)
router.route('/gellallacceptedpickups/:DealerId').get(getAllAcceptedPickUps)

export default router