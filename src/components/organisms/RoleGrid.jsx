import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { roleService } from "@/services/api/roleService";

const RoleGrid = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadRoles = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await roleService.getAll();
      setRoles(data.filter(role => role.isActive));
    } catch (err) {
      setError("Failed to load available positions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleApply = (roleId) => {
    navigate(`/apply/${roleId}`);
  };

  if (loading) {
    return <Loading text="Loading available positions..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadRoles} />;
  }

  if (roles.length === 0) {
    return (
      <Empty
        icon="Briefcase"
        title="No positions available"
        message="We don't have any open positions at the moment. Please check back soon for new opportunities!"
        actionLabel="Refresh"
        onAction={loadRoles}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roles.map((role) => (
        <Card 
          key={role.Id} 
          className="p-6 hover:shadow-strong hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          onClick={() => handleApply(role.Id)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ApperIcon name={role.icon} className="text-primary-600" size={24} />
            </div>
            <Badge variant="primary" size="sm">
              {role.type}
            </Badge>
          </div>

          <h3 className="text-lg font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
            {role.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {role.description}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <ApperIcon name="MapPin" size={16} className="mr-2 text-gray-400" />
              {role.location}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ApperIcon name="DollarSign" size={16} className="mr-2 text-gray-400" />
              {role.salaryRange}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ApperIcon name="Clock" size={16} className="mr-2 text-gray-400" />
              {role.commitment}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Key Skills:</p>
            <div className="flex flex-wrap gap-1.5">
              {role.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="default" size="sm">
                  {skill}
                </Badge>
              ))}
              {role.skills.length > 3 && (
                <Badge variant="default" size="sm">
                  +{role.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <Button 
            variant="primary" 
            className="w-full group-hover:scale-105 transition-transform duration-200"
            icon="ArrowRight"
            iconPosition="right"
          >
            Apply Now
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default RoleGrid;