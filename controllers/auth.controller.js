const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

const router = express.Router()
const prisma = new PrismaClient()
dotenv.config()


class AuthController {

}

module.exports = new AuthController()