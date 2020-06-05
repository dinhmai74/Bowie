import { mailRegex } from 'utils/pattern/pattern'

test('valid email', () => {
  const match = mailRegex.test('dinhmai@gmail.com')
  expect(match).toEqual(true)
})

test('invalid email', () => {
  const match = mailRegex.test('dinhmai')
  expect(match).toEqual(false)
})

test('invalid email with special character', () => {
  const match = mailRegex.test('dinhmai&^&^DS!@!@#@@gmail.com')
  expect(match).toEqual(false)
})
