import { useState, useCallback } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { GoGear } from 'react-icons/go';
import { auth, storage } from '../../firebase/index';
import { uploadString, ref, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const SettingModal = ({ closeModal }) => {
	const [image, setImage] = useState(null);
	const [editor, setEditor] = useState(null);

	const handleDrop = useCallback((acceptedFiles) => {
		setImage(acceptedFiles[0]);
	}, []);

	const handleImageChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.onload = (event) => setImage(event.target.result);
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const setEditorRef = (editor) => {
		if (editor) {
			setEditor(editor);
		}
	};

	const onSave = async () => {
		const user = auth.currentUser;
		const storageRef = ref(storage, `avatars/${user.uid}`);
		if (editor) {
			try {
				const canvas = editor.getImageScaledToCanvas();
				const base64Img = canvas.toDataURL();
				await uploadString(storageRef, base64Img, 'data_url');
				const url = await getDownloadURL(storageRef);
				await updateProfile(user, { photoURL: url });
				closeModal();
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<Modal title="Settings" closeModal={() => closeModal()}>
			<div className='flex gap-6 p-4 h-full"'>
				<div className="m-2">
					<button className="flex items-center px-2 py-1 gap-2 rounded-md bg-neutral-200">
						<GoGear />
						<span className="text-sm">General</span>
					</button>
				</div>
				<div className="w-full">
					<label>
						Upload Avatar
						<input
							type="file"
							onChange={handleImageChange}
							accept="image/png, image/gif, image/jpeg"
							className="mb-4 text-sm w-full  file:rounded-md file:border-0 file:mr-4 file:py-2 file:px-4 hover:file:bg-slate-200/40"
						/>
					</label>
					{image && (
						<Dropzone onDrop={handleDrop} noClick noKeyboard>
							{({ getRootProps, getInputProps }) => (
								<div
									{...getRootProps()}
									style={{ width: '200px', height: '250px' }}
								>
									<AvatarEditor
										width={200}
										height={200}
										image={image}
										ref={setEditorRef}
										border={10}
										borderRadius={100}
									/>
									<input {...getInputProps()} />
								</div>
							)}
						</Dropzone>
					)}

					<button
						onClick={onSave}
						className="rounded-lg px-3 py-2 text-sm border-black/10 border hover:bg-slate-200/40"
					>
						Upload
					</button>
				</div>
			</div>
		</Modal>
	);
};

SettingModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default SettingModal;
