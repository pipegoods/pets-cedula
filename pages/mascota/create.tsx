import { API_URL_FILES } from 'config/contans';
import { uploadFiles } from 'config/services/uploadFiles';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type tplotOptions = {
  [key: string]: string[];
};

const BLOODTYPE: tplotOptions = {
  dog: [
    'DEA-1.1',
    'DEA-1.2',
    'DEA-3',
    'DEA-4',
    'DEA-5',
    'DEA-6',
    'DEA-7',
    'DEA-8',
  ],
  cat: ['A', 'B', 'AB'],
};

const CreatePet: NextPage = () => {
  const { data } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    bloodType: '',
    breed: '',
    animal: '',
    age: 0,
  });

  const [image, setImage] = useState<File>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setImage(fileList[0]);
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const photo_name = await uploadFiles(image as File);
    setFormData({
      ...formData,
      photo: photo_name.url,
    });

    await fetch('/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        age: Number(formData.age),
        ownerId: data?.user.id,
      }),
    });
  };

  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold mb-5">Crear mascota</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Nombre</span>
            <input
              type="text"
              placeholder="Firulais IV"
              className="input input-bordered"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Tu mascota es:</span>
            <select
              className="select w-full max-w-xs"
              value={formData.animal}
              onChange={selectChange}
              name="animal"
            >
              <option disabled value="">
                Seleccione una opción
              </option>
              <option value="dog">Perro</option>
              <option value="cat">Gato</option>
            </select>
          </label>
        </div>
        {formData.animal !== '' && (
          <div className="form-control">
            <label className="input-group input-group-vertical">
              <span>Tipo de sangre</span>
              <select
                className="select w-full max-w-xs"
                value={formData.bloodType}
                onChange={selectChange}
                name="bloodType"
              >
                <option disabled selected>
                  Seleccione una opción
                </option>
                {BLOODTYPE[formData.animal].map((bloodType) => (
                  <option key={bloodType}>{bloodType}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Raza</span>
            <input
              type="text"
              placeholder="Fino"
              className="input input-bordered"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Edad (en años)</span>
            <input
              type="number"
              placeholder="5 años"
              className="input input-bordered"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Imagen de tu mascota</span>
            <input
              type="file"
              placeholder="Imagen de tu mascota"
              className="input input-bordered"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <input
          type="submit"
          value="Crear mascota"
          disabled={!image}
          className="cursor-pointer btn btn-primary"
        />
      </form>
    </div>
  );
};

export default CreatePet;
