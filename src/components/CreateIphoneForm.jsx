import { useState } from 'react'
import { toast } from 'react-toastify'
import { useCreateIphoneMutation } from '../app/api/iphoneApiSlice'

const CreateIphoneForm = () => {
  const [createIphone, { isLoading }] = useCreateIphoneMutation()
  const [formData, setFormData] = useState({
    name: '',
    released: '',
    weight: 0,
    dimensions: { width: 0, height: 0, depth: 0 },
    displayType: '',
    displaySize: 0,
    resolution: '',
    protection: '',
    chipSet: '',
    cpu: '',
    gpu: '',
    os: { original: '', upgrade: '' },
    memory: [],
    camera: { rear: [], front: 0 },
    battery: '',
    images: [],
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDimensionChange = e => {
    setFormData({
      ...formData,
      dimensions: { ...formData.dimensions, [e.target.name]: e.target.value },
    })
  }

  const handleOsChange = e => {
    setFormData({
      ...formData,
      os: { ...formData.os, [e.target.name]: e.target.value },
    })
  }

  const handleMemoryChange = (index, field, value) => {
    const newMemory = [...formData.memory]
    newMemory[index][field] = value
    setFormData({ ...formData, memory: newMemory })
  }

  const addMemory = () => {
    setFormData({
      ...formData,
      memory: [...formData.memory, { rom: '', ram: '', price: 0 }],
    })
  }

  const handleRearCameraChange = (index, value) => {
    const newRear = [...formData.camera.rear]
    newRear[index] = value
    setFormData({ ...formData, camera: { ...formData.camera, rear: newRear } })
  }

  const addRearCamera = () => {
    setFormData({
      ...formData,
      camera: { ...formData.camera, rear: [...formData.camera.rear, 0] },
    })
  }

  const handleImageChange = (index, field, value) => {
    const newImages = [...formData.images]
    newImages[index][field] = value
    setFormData({ ...formData, images: newImages })
  }

  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, { color: '', img: '' }],
    })
  }

  const deleteMemory = index => {
    const newMemory = [...formData.memory]
    newMemory.splice(index, 1)
    setFormData({ ...formData, memory: newMemory })
  }

  const deleteCamera = index => {
    const newRear = [...formData.camera.rear]
    newRear.splice(index, 1)
    setFormData({ ...formData, camera: { ...formData.camera, rear: newRear } })
  }

  const deleteImage = index => {
    const newImages = [...formData.images]
    newImages.splice(index, 1)
    setFormData({ ...formData, images: newImages })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await createIphone(formData).unwrap()
      toast.success('iPhone created successfully!')
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='p-6 max-w-4xl mx-auto text-white space-y-4'
    >
      <h1 className='text-2xl font-bold mb-4'>Create iPhone</h1>

      {/* Basic Inputs */}
      <input
        className='input'
        type='text'
        name='name'
        placeholder='Name'
        onChange={handleChange}
      />
      <input
        className='input'
        type='date'
        name='released'
        onChange={handleChange}
      />
      <input
        className='input'
        type='number'
        name='weight'
        placeholder='Weight (g)'
        step={0.1}
        onChange={handleChange}
      />
      <input
        className='input'
        type='text'
        name='displayType'
        placeholder='Display Type'
        onChange={handleChange}
      />
      <input
        className='input'
        type='number'
        name='displaySize'
        placeholder='Display Size (inches)'
        step={0.1}
        onChange={handleChange}
      />
      <input
        className='input'
        type='text'
        name='resolution'
        placeholder='Resolution (e.g. 1179x2556)'
        onChange={handleChange}
      />
      <input
        className='input'
        type='text'
        name='protection'
        placeholder='Protection'
        onChange={handleChange}
      />
      <input
        className='input'
        type='text'
        name='chipSet'
        placeholder='Chipset'
        onChange={handleChange}
      />
      <input
        className='input'
        type='text'
        name='cpu'
        placeholder='CPU'
        onChange={handleChange}
      />
      <input
        className='input'
        type='text'
        name='gpu'
        placeholder='GPU'
        onChange={handleChange}
      />

      {/* Dimensions */}
      <h2 className='font-semibold'>Dimensions (mm)</h2>
      <div className='flex gap-2'>
        <input
          className='input'
          type='number'
          name='height'
          placeholder='Height'
          step={0.1}
          onChange={handleDimensionChange}
        />
        <input
          className='input'
          type='number'
          name='width'
          placeholder='Width'
          step={0.1}
          onChange={handleDimensionChange}
        />
        <input
          className='input'
          type='number'
          name='depth'
          placeholder='Depth'
          step={0.1}
          onChange={handleDimensionChange}
        />
      </div>

      {/* OS */}
      <h2 className='font-semibold'>Operating System</h2>
      <div className='flex gap-2'>
        <input
          className='input'
          type='text'
          name='original'
          placeholder='Original OS'
          onChange={handleOsChange}
        />
        <input
          className='input'
          type='text'
          name='upgrade'
          placeholder='Upgradeable to'
          onChange={handleOsChange}
        />
      </div>

      {/* Battery */}
      <input
        className='input'
        type='text'
        name='battery'
        placeholder='Battery'
        onChange={handleChange}
      />

      {/* Memory */}
      <h2 className='font-semibold'>Memory</h2>
      {formData.memory.map((m, index) => (
        <div key={index} className='flex gap-2 items-center'>
          <input
            className='input'
            type='text'
            placeholder='ROM'
            value={m.rom}
            onChange={e => handleMemoryChange(index, 'rom', e.target.value)}
          />
          <input
            className='input'
            type='text'
            placeholder='RAM'
            value={m.ram}
            onChange={e => handleMemoryChange(index, 'ram', e.target.value)}
          />
          <input
            className='input'
            type='number'
            placeholder='Price'
            step={0.1}
            value={m.price}
            onChange={e => handleMemoryChange(index, 'price', e.target.value)}
          />
          <button
            className='bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md cursor-pointer'
            onClick={() => deleteMemory(index)}
          >
            Delete
          </button>
        </div>
      ))}
      <button type='button' onClick={addMemory} className='btn'>
        + Add Memory
      </button>

      {/* Camera */}
      <h2 className='font-semibold'>Rear Cameras</h2>
      {formData.camera.rear.map((c, index) => (
        <div key={index} className='flex gap-2'>
          <input
            key={index}
            className='input'
            type='number'
            placeholder='Rear Camera MP'
            value={c}
            onChange={e => handleRearCameraChange(index, e.target.value)}
          />
          <button
            className='bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md cursor-pointer'
            onClick={() => deleteCamera(index)}
          >
            Delete
          </button>
        </div>
      ))}
      <button type='button' onClick={addRearCamera} className='btn'>
        + Add Rear Camera
      </button>

      <input
        className='input'
        type='number'
        name='front'
        placeholder='Front Camera MP'
        onChange={e =>
          setFormData({
            ...formData,
            camera: { ...formData.camera, front: e.target.value },
          })
        }
      />

      {/* Images */}
      <h2 className='font-semibold'>Images</h2>
      {formData.images.map((img, index) => (
        <div key={index} className='flex gap-2'>
          <input
            className='input'
            type='text'
            placeholder='Color (hex)'
            value={img.color}
            onChange={e => handleImageChange(index, 'color', e.target.value)}
          />
          <input
            className='input'
            type='text'
            placeholder='Image Path (like /uploads/xxx.jpg)'
            value={img.img}
            onChange={e => handleImageChange(index, 'img', e.target.value)}
          />
          <div
            className='h-14 w-14 rounded-full'
            style={{ backgroundColor: img.color }}
          ></div>
          <button
            className='bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md cursor-pointer'
            onClick={() => deleteImage(index)}
          >
            Delete
          </button>
        </div>
      ))}
      <button type='button' onClick={addImage} className='btn'>
        + Add Image
      </button>

      {/* Submit */}
      <button
        type='submit'
        disabled={isLoading}
        className='btn bg-green-600 hover:bg-green-700 ml-5'
      >
        Create iPhone
      </button>
    </form>
  )
}

export default CreateIphoneForm
