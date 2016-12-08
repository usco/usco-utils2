import test from 'ava'
import computeTMatrixFromTransforms from './computeTMatrixFromTransforms'

test('computeTMatrixFromTransforms ', t => {

  const transforms = {pos: [10, 15, -7], rot: [0, 0, 1], sca: [1, 1, 1]}
  const tMatrix = computeTMatrixFromTransforms(transforms)
  const expTMatrix = []

  t.deepEqual(tMatrix, expTMatrix)
})
