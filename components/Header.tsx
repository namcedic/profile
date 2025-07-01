'use client'
import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Img} from "react-image";
import {Button} from "antd";

export const Header = () => {
	const title = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore\n' +
		'\t\t\t\t\t\tet dolore magna aliqua Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor\n' +
		'\t\t\t\t\t\tincididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet consectetur adipiscing\n' +
		'\t\t\t\t\t\telit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit\n' +
		'\t\t\t\t\t\tamet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna\n' +
		'\t\t\t\t\t\taliqua Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt\n' +
		'\t\t\t\t\t\tut labore et dolore magna aliqua'

	const [showFull, setShowFull] = useState(false);

	const handleToggle = () => {
		console.log(!showFull);
		console.warn(!showFull);
		setShowFull(!showFull);
	};
	return (
		<header className='header-bar'>
			<div className='user-info'>
				<div className='info-left'>
					<div className='info-circle'><FontAwesomeIcon className='user-icon' icon={faUser} /></div>
					<p> Tran Thanh Nam</p>
				</div>
				<div className='info-right'>
					<p> Technician</p>
				</div>
			</div>
			<div className='header-content'>
				<div className='header-content-left'>
					<h1 className='pb-5'>Technology Developer</h1>
					<p
						className={`description ${showFull ? 'show' : 'clamp'}`}
						onClick={handleToggle}
					>
						{title}
					</p>

					<Button className='btn mt-5' type='default' onClick={handleToggle}>Detail</Button>
				</div>

				<div className='header-content-right'>
					<Img src='static/images/avatar.jpg' className='avatar' alt='logo' />
					<h3 className='p-2 pb-3'>Fullstack Developer</h3>
					<p> Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
				</div>

			</div>
		</header>
	)
}
