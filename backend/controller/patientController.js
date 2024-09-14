import Patient from '../models/patientModel.js'

export const create=async(req,res)=>{
    try{
        const pateintData=new Patient(req.body);
        if(!pateintData){
            return res.status(404).json({msg:'User data not found'});
        }

        const savedData=await pateintData.save();
        res.status(200).json({
            message:'Data saved successfully',
            data:savedData
        })
    } catch(error){
        res.status(500).json({error:error.message});
    }
}

export const getData=async(req,res)=>{
    try{
        const patientData=await Patient.find();
        if(!patientData){
            return res.status(404).json({msg:'User data not found'})
        }
        res.status(200).json(patientData);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


export const getone=async(req,res)=>{
    try{
        const id=req.params.id;
        const userExist= await Patient.findById(id);
        if(!userExist){
            return res.status(404).json({msg:'User not found'});
        }
        res.status(200).json(userExist);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

export const update=async(req,res)=>{
    try{
        const id=req.params.id;
        const userExist=await Patient.findById(id);
        if(!userExist){
            return res.status(404).json({ msg: 'User data not found' }); 
        }
        const updatedData=await Patient.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            message:'Data updated succesfully',
            data:updatedData
        })
    }catch(error){
        res.status(500).json({error:error.message}); 
    }
}

export const deleteData=async(req,res)=>{
    try{
        const id=req.params.id;
        const userExist=await Patient.findById(id);
        if(!userExist){
            return res.status(404).json({ msg: 'User data not found' }); 
        }
        await Patient.findByIdAndDelete
        (id);
        res.status(200).json({msg:'User deleted successfully'});
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}