"use client"
import { Suspense } from "react";
import NewApp from "./new-app";

const pagination = "<1/12 Pages >";

const initialFormData = {
    application_details: ""
}

const NewApplication = () => {
    const { createQueryString, param } = useQueryString();
    const { formData, handleChange, setFormData } = useForm(initialFormData);
    const pathname = usePathname();
    const router = useRouter();


    const proceedToNextStep = () => {
        if (!formData.application_details) {
            toast("Select a field to proceed!", { autoClose: 3000 });
            return;
        }
        router.push(pathname + "?" + createQueryString("tab", formData.application_details))
    }

    if (!param) {
        return (
            <Suspense>
                <DashboardLayout header="Dashboard" icon="">
                    <div className="space-y-10 w-full">
                        <ApplicationDetails
                            proceedToNextStep={proceedToNextStep}
                            formData={formData}
                            setFormData={setFormData}
                            handleChange={handleChange} />
                    </div>
                </DashboardLayout>
            </Suspense>
        )
    }

    if (param) {
        return (
            <Suspense>
                <DashboardLayout header="Dashboard" icon="">
                    <div className="space-y-10 w-full">
                        <ApplicationForm />
                    </div>
                </DashboardLayout>
            </Suspense>
        )
    }
};

export default NewApplication;
