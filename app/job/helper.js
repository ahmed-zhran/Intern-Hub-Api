



function addCompanyNameAndImageToResponse(filteredData) {
    return filteredData.map(document => {
        const job = document.toObject();
        job.companyName = job.company[0]?.name;
        job.companyImage = job.company[0]?.image;
        delete job.company;
        return job;
    });
}





function prepareQuery(title, type, location, duration, salary, salaryType, jobType, skills,durationType) {
    return {
        statusOfIntern: "active",
        ...(title && {title}),
        ...(type && {internType: type}),
        ...(location && {internLocation: location}),
        ...(duration && {duration}),
        ...(salary && {Salary: salary}),
        ...(salaryType && {salaryType}),
        ...(salary && {Salary: salary}),
        ...(durationType && {durationType}),
        ...(jobType && {jobType}),
        ...(skills && {skills: {$in: skills.split(',')}})
    };
}


module.exports={
    addCompanyNameAndImageToResponse,
    prepareQuery
}