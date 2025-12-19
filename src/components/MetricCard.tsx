import { Card } from "react-bootstrap";

interface MetricCardProps {
    label: string;
    value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => {
    return (
        <div className="apple-card mb-4 text-center">

            <h4 className="gray-text">{label}</h4>
            <h2 className="apple-subtitle-primary">
                {value}
            </h2>

        </div>
    );
};

export default MetricCard;
