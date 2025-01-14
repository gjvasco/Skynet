import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';

export default function EditarUsuario (props) {  
  
  const { form, formData, updateFormData } = useFormData(null);
  var { _id } = useParams();
  var usuario= _id;
  _id=props._id;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: {_id, usuario },
  });

  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    if(formData.clave===""){
      delete formData.clave;
    }
    
    editarUsuario({
      variables: { _id, usuario, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
      setTimeout( function() { window.location.href = `/usuario`; }, 5000 );
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
      setTimeout( function() { window.location.href = `/usuario`; }, 5000 );
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;
  return (
    <div className="w-full">
      <Link to='/usuarios/'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
    <div className="bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
    <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
            <p className="text-3xl font-bold leading-7 text-center">Editar Usuario</p>
            <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        >
                <div className="md:flex items-center mt-12">
                    <div className="w-full md:w-1/2 flex flex-col">
                        <label className="font-semibold leading-none">Nombre de la persona:</label>
                        <input 
                         name='nombre'
                         defaultValue={queryData.Usuario.nombre}
                         required={true}
                        type="text" className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                        <label className="font-semibold leading-none">Email de la persona:</label>
                        <input 
                         type='email'
                         name='email'
                         defaultValue={queryData.Usuario.email}
                         required={true}
                         className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"/>
                    </div>
                </div>
                <div className="md:flex items-center mt-12">
                    <div className="w-full md:w-1/2 flex flex-col">
                        <label className="font-semibold leading-none">Identificación de la persona:</label>
                        <input 
                          type='text'
                          name='idUsuario'
                          defaultValue={queryData.Usuario.idUsuario}
                          required={true} className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                    <label className="font-semibold leading-none">Rol del usuario:</label>
                        <span className="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200"> {queryData.Usuario.rol}</span>
                    </div>
                </div>
                <div className="md:flex items-center mt-8"></div>
                {usuario===_id ?(<div className="w-full md:w-1/2 flex flex-col">
                        <label className="font-semibold leading-none">Contraseña:</label>
                        <input 
                          type='password'
                          name='clave'
                          className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                    </div>):(<hr/>)}
                    
                <div className="flex items-center justify-center w-full">
                
                <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
                    
                </div>
            </form>
        </div>
    </div>

  
    </div>
  );
};

