
# PlanAhead Launch Script for Post-Synthesis pin planning, created by Project Navigator

create_project -name multiplier -dir "C:/Users/Coert/Desktop/test/multiplier/planAhead_run_2" -part xc6slx9csg324-2
set_property design_mode GateLvl [get_property srcset [current_run -impl]]
set_property edif_top_file "C:/Users/Coert/Desktop/test/multiplier/multiplier.ngc" [ get_property srcset [ current_run ] ]
add_files -norecurse { {C:/Users/Coert/Desktop/test/multiplier} }
set_param project.pinAheadLayout  yes
set_property target_constrs_file "multiplier.ucf" [current_fileset -constrset]
add_files [list {multiplier.ucf}] -fileset [get_property constrset [current_run]]
link_design
