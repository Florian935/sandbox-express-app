const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const members = require('../../members')

// Gets all members
router.get('/', (req, res) => res.json(members))

// Get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json(
            members.find(
                member => member.id === parseInt(req.params.id)
            )
        );
    } else {
        res
            .status(400)
            .json({ msg: `No member with the id of ${req.params.id} found` })
    }
})

// Create member
router.post('/', (req, res) => {
    const newMember = parseNewMemberFromBodyRequest(req.body)

    if (!checkNameAndEmailEntered(newMember)) {
        return res
            .status(400)
            .json({ msg: 'Please include a name and email' })
    }
    members.push(newMember)
    res.json(members)
    // res.redirect('/')
})

function parseNewMemberFromBodyRequest(requestBody) {
    return {
        id: uuid.v4(),
        name: requestBody.name,
        email: requestBody.email,
        status: 'active'
    }
}

function checkNameAndEmailEntered(newMember) {
    return newMember.name && newMember.email
}

// Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        const updateMember = req.body
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name
                member.email = updateMember.email ? updateMember.email : member.email

                res.json({ msg: 'Member updated', member })
            }
        })
    } else {
        res
            .status(400)
            .json({ msg: `No member with the id of ${req.params.id} found` })
    }
})

// Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json({
            msg: 'Member delected',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        })
    } else {
        res
            .status(400)
            .json({ msg: `No member with the id of ${req.params.id} found` })
    }
})

module.exports = router;