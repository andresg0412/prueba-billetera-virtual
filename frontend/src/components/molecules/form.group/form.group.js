import Label from "@/components/atoms/label/label.component";
import Input from "@/components/atoms/input/input.component";
import styles from "./form.group.module.css";
function FormGroup({ id, type, placeholder, label, onChange }) {
    return (
        <div className={styles.formGroup}>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type={type} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}

export default FormGroup;
