import Modal from '@/components/common/Modal';
import LoginComponent from '../login/LoginComponent';

interface Props {
    showModal: boolean;
    onCloseModal?: () => void;
}

const LoginModal = ({ showModal, onCloseModal = () => null }: Props) => (
    <Modal closeButton showModal={showModal} bgColor="#191F2D" onCloseModal={onCloseModal}>
        <div className="-mx-4 -mb-5">
            <LoginComponent />
        </div>
    </Modal>
);

export default LoginModal;
